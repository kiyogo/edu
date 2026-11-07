import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import { STORAGE_DIR } from './unifiedStorage';
import { HomeworkItem, HomeworkSubmission } from '../homeworkApi';

export interface ParticipantRecord {
  id: string;
  homeworkId: string;
  pin: string;
  studentName: string;
  studentId?: string;
  status: 'in_progress' | 'submitted';
  score?: number;
  correctCount?: number;
  totalQuestions?: number;
  timeSpentSeconds?: number;
  submittedAt?: string;
  joinedAt: string;
  violationCount?: number;
  violationLogs?: any[];
  answers?: any;
}

const DB_DIR = path.join(STORAGE_DIR, 'db');
const HOMEWORKS_FILE = path.join(DB_DIR, 'homeworks.json');
const SUBMISSIONS_FILE = path.join(DB_DIR, 'homework_submissions.json');

class HomeworkDatabase {
  private homeworkCache: HomeworkItem[] | null = null;
  private submissionCache: ParticipantRecord[] | null = null;
  private isHwLoaded = false;
  private isSubLoaded = false;
  private hwWriteLock: Promise<void> = Promise.resolve();
  private subWriteLock: Promise<void> = Promise.resolve();

  private async ensureDir() {
    try {
      if (!fsSync.existsSync(DB_DIR)) {
        await fs.mkdir(DB_DIR, { recursive: true });
      }
    } catch (err) {
      console.error('[HomeworkDB] Failed to ensure DB dir:', err);
    }
  }

  private async loadHomeworks(): Promise<HomeworkItem[]> {
    if (this.homeworkCache && this.isHwLoaded) return this.homeworkCache;
    await this.ensureDir();

    try {
      if (fsSync.existsSync(HOMEWORKS_FILE)) {
        const raw = await fs.readFile(HOMEWORKS_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          this.homeworkCache = parsed;
          this.isHwLoaded = true;
          return this.homeworkCache;
        }
      }
    } catch (err) {
      console.warn('[HomeworkDB] Could not load homeworks.json, starting fresh:', err);
    }

    this.homeworkCache = [];
    this.isHwLoaded = true;
    return this.homeworkCache;
  }

  private async saveHomeworksToFile(items: HomeworkItem[]): Promise<void> {
    await this.ensureDir();
    this.hwWriteLock = this.hwWriteLock.then(async () => {
      try {
        const tempPath = `${HOMEWORKS_FILE}.tmp.${Date.now()}`;
        await fs.writeFile(tempPath, JSON.stringify(items, null, 2), 'utf-8');
        await fs.rename(tempPath, HOMEWORKS_FILE);
      } catch (err) {
        console.error('[HomeworkDB] Failed to save homeworks to file:', err);
        throw err;
      }
    });
    return this.hwWriteLock;
  }

  private async loadSubmissions(): Promise<ParticipantRecord[]> {
    if (this.submissionCache && this.isSubLoaded) return this.submissionCache;
    await this.ensureDir();

    try {
      if (fsSync.existsSync(SUBMISSIONS_FILE)) {
        const raw = await fs.readFile(SUBMISSIONS_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          this.submissionCache = parsed;
          this.isSubLoaded = true;
          return this.submissionCache;
        }
      }
    } catch (err) {
      console.warn('[HomeworkDB] Could not load submissions.json, starting fresh:', err);
    }

    this.submissionCache = [];
    this.isSubLoaded = true;
    return this.submissionCache;
  }

  private async saveSubmissionsToFile(items: ParticipantRecord[]): Promise<void> {
    await this.ensureDir();
    this.subWriteLock = this.subWriteLock.then(async () => {
      try {
        const tempPath = `${SUBMISSIONS_FILE}.tmp.${Date.now()}`;
        await fs.writeFile(tempPath, JSON.stringify(items, null, 2), 'utf-8');
        await fs.rename(tempPath, SUBMISSIONS_FILE);
      } catch (err) {
        console.error('[HomeworkDB] Failed to save submissions to file:', err);
        throw err;
      }
    });
    return this.subWriteLock;
  }

  public async getAllHomeworks(): Promise<HomeworkItem[]> {
    return await this.loadHomeworks();
  }

  public async getHomeworkByPin(pin: string): Promise<HomeworkItem | null> {
    const cleanPin = (pin || '').trim().replace(/\s+/g, '');
    if (!cleanPin) return null;

    const list = await this.loadHomeworks();
    return list.find((h) => {
      if (h.pin === cleanPin) return true;
      if (h.id === cleanPin) return true;
      if (String(h.id).replace(/\D/g, '').slice(-6) === cleanPin) return true;
      return false;
    }) || null;
  }

  public async getHomeworkById(id: string): Promise<HomeworkItem | null> {
    if (!id) return null;
    const list = await this.loadHomeworks();
    return list.find((h) => h.id === id) || null;
  }

  public async getLatestByDocumentId(documentId: string): Promise<HomeworkItem | null> {
    if (!documentId) return null;
    const list = await this.loadHomeworks();
    return list.find((h) => h.documentId === documentId) || null;
  }

  public async saveHomework(item: HomeworkItem): Promise<HomeworkItem> {
    const list = await this.loadHomeworks();
    const existingIdx = list.findIndex((h) => h.id === item.id || h.pin === item.pin);
    if (existingIdx >= 0) {
      list[existingIdx] = { ...list[existingIdx], ...item };
    } else {
      list.unshift(item);
    }
    await this.saveHomeworksToFile(list);
    return item;
  }

  public async getSubmissionsByPinOrId(pinOrId: string): Promise<ParticipantRecord[]> {
    const clean = (pinOrId || '').trim().replace(/\s+/g, '');
    if (!clean) return [];

    const list = await this.loadSubmissions();
    return list.filter((s) => s.pin === clean || s.homeworkId === clean);
  }

  public async recordParticipant(
    pinOrId: string,
    studentName: string,
    studentId?: string,
    homeworkId?: string
  ): Promise<ParticipantRecord> {
    const cleanPin = (pinOrId || '').trim().replace(/\s+/g, '');
    const cleanName = (studentName || '').trim();
    const list = await this.loadSubmissions();

    const existingIdx = list.findIndex((s) => {
      const matchPin = s.pin === cleanPin || (homeworkId && s.homeworkId === homeworkId);
      if (!matchPin) return false;
      if (studentId && s.studentId && s.studentId === studentId) return true;
      return s.studentName.trim().toLowerCase() === cleanName.toLowerCase();
    });

    if (existingIdx >= 0) {
      return list[existingIdx];
    }

    const newRecord: ParticipantRecord = {
      id: `part_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      homeworkId: homeworkId || cleanPin,
      pin: cleanPin,
      studentName: cleanName,
      studentId: studentId || undefined,
      status: 'in_progress',
      joinedAt: new Date().toISOString(),
    };

    list.unshift(newRecord);
    await this.saveSubmissionsToFile(list);
    return newRecord;
  }

  public async saveSubmission(submission: HomeworkSubmission): Promise<ParticipantRecord> {
    const list = await this.loadSubmissions();
    const cleanName = submission.studentName.trim().toLowerCase();

    const existingIdx = list.findIndex((s) => {
      const matchHw = s.homeworkId === submission.homeworkId || s.pin === submission.pin;
      if (!matchHw) return false;
      if (submission.studentId && s.studentId && s.studentId === submission.studentId) return true;
      return s.studentName.trim().toLowerCase() === cleanName;
    });

    const record: ParticipantRecord = {
      id: submission.id || `sub_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      homeworkId: submission.homeworkId,
      pin: submission.pin,
      studentName: submission.studentName,
      studentId: submission.studentId,
      status: 'submitted',
      score: submission.score,
      correctCount: submission.correctCount,
      totalQuestions: submission.totalQuestions,
      timeSpentSeconds: submission.timeSpentSeconds,
      submittedAt: submission.submittedAt || new Date().toISOString(),
      joinedAt: existingIdx >= 0 ? list[existingIdx].joinedAt : (submission.submittedAt || new Date().toISOString()),
      violationCount: submission.violationCount,
      violationLogs: submission.violationLogs,
      answers: submission.answers,
    };

    if (existingIdx >= 0) {
      list[existingIdx] = record;
    } else {
      list.unshift(record);
    }

    await this.saveSubmissionsToFile(list);

    // Update homework submissions count in homeworks.json
    try {
      const hwList = await this.loadHomeworks();
      const hw = hwList.find((h) => h.id === submission.homeworkId || h.pin === submission.pin);
      if (hw) {
        const currentSubs = list.filter(
          (s) => (s.homeworkId === hw.id || s.pin === hw.pin) && s.status === 'submitted'
        );
        hw._count = { submissions: currentSubs.length };
        await this.saveHomeworksToFile(hwList);
      }
    } catch (err) {
      console.warn('[HomeworkDB] Failed to update homework count:', err);
    }

    return record;
  }
}

export const homeworkDb = new HomeworkDatabase();
