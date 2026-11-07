'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  ChevronRight,
  Folder,
  FileText,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface BreadcrumbFolderItem {
  id: string;
  name: string;
  parentId?: string | null;
}

export interface BreadcrumbFileItem {
  id: string;
  name: string;
  parentId?: string | null;
  fileType?: 'docx' | 'txt' | 'pdf' | 'other' | string;
  createdAt?: string;
  parsedQuiz?: {
    title?: string;
    questions?: any[];
  };
}

export interface BreadcrumbDropdownItem {
  id?: string;
  name?: string;
  label?: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  isDivider?: boolean;
  isActive?: boolean;
}

interface BreadcrumbChevronProps {
  /** Explicit custom dropdown items (for non-folder breadcrumbs like Settings, Classes, Create modes) */
  items?: BreadcrumbDropdownItem[];
  /** Optional custom title/label for the dropdown header */
  menuTitle?: string;
  /** The folder ID whose children should be displayed (for documents). null = Root ("Tài liệu của tôi") */
  folderId?: string | null;
  /** List of all folders (if not supplied or empty, will read from localStorage) */
  allFolders?: BreadcrumbFolderItem[];
  /** Optional list of all files to display sub-documents */
  allFiles?: BreadcrumbFileItem[];
  /** Custom folder navigation callback. If not provided, routes to /app/documents?folderId=... */
  onNavigateFolder?: (folderId: string) => void;
  /** Custom file navigation callback. If not provided, routes to /app/documents/[fileId]/view */
  onNavigateFile?: (fileId: string) => void;
  /** If true, returns null when there are no items to drop down. Defaults to false */
  hideWhenEmpty?: boolean;
  /** If true, renders a static chevron separator when there are no items to drop down. Defaults to true */
  fallbackToStaticChevron?: boolean;
  /** If true, always renders as a static chevron separator without dropdown */
  isStatic?: boolean;
  className?: string;
}

export function BreadcrumbChevron({
  items,
  menuTitle,
  folderId,
  allFolders,
  allFiles,
  onNavigateFolder,
  onNavigateFile,
  hideWhenEmpty = false,
  fallbackToStaticChevron = true,
  isStatic,
  className = '',
}: BreadcrumbChevronProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close dropdown on click outside or Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Load child folders
  const subfolders = useMemo((): BreadcrumbFolderItem[] => {
    if (items || isStatic) return [];
    let source = allFolders;
    if (source === undefined && isMounted) {
      if (typeof window !== 'undefined') {
        try {
          const raw = localStorage.getItem('app_documents_folders');
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) source = parsed;
          }
        } catch {}
      }
    }
    const list = Array.isArray(source) ? source : [];
    if (folderId === undefined) return [];
    if (folderId === null) {
      return list.filter((f) => !f.parentId);
    }
    return list.filter((f) => f.parentId === folderId);
  }, [items, isStatic, allFolders, folderId, isMounted]);

  // Load child files
  const subfiles = useMemo((): BreadcrumbFileItem[] => {
    if (items || isStatic) return [];
    let source = allFiles;
    if (source === undefined && isMounted) {
      if (typeof window !== 'undefined') {
        try {
          const raw = localStorage.getItem('app_documents_files');
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) source = parsed;
          }
        } catch {}
      }
    }
    const list = Array.isArray(source) ? source : [];
    if (folderId === undefined) return [];
    if (folderId === null) {
      return list.filter((f) => !f.parentId);
    }
    return list.filter((f) => f.parentId === folderId);
  }, [items, isStatic, allFiles, folderId, isMounted]);

  const totalItems = items ? items.length : subfolders.length + subfiles.length;

  if (isStatic || totalItems === 0) {
    if (hideWhenEmpty && !isStatic) {
      return null;
    }
    if (isStatic || fallbackToStaticChevron) {
      return (
        <span className={`w-6 h-6 flex items-center justify-center text-slate-400 dark:text-slate-500 shrink-0 select-none ${className}`}>
          <ChevronRight size={14} className="stroke-[2]" />
        </span>
      );
    }
    return null;
  }

  return (
    <div ref={containerRef} className={`relative inline-flex items-center justify-center w-6 h-6 shrink-0 ${className}`}>
      {/* Google Style Chevron Dropdown Trigger */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        title={menuTitle || 'Mở danh sách'}
        className={`w-6 h-6 rounded flex items-center justify-center cursor-pointer select-none ${
          isOpen
            ? 'bg-slate-200/90 dark:bg-[#333333] text-slate-900 dark:text-slate-100'
            : 'text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-[#2a2a2a]'
        }`}
      >
        <ChevronRight
          size={14}
          className={`stroke-[2] ${isOpen ? 'rotate-90 text-slate-800 dark:text-slate-200' : ''}`}
        />
      </button>

      {/* Windows 11 Address Bar Dropdown Menu (Acrylic Frosted Glass Blur) */}
      {isOpen && (
        <div
          className="absolute left-0 top-full mt-1.5 z-50 min-w-[200px] max-w-[340px] w-max max-h-[360px] flex flex-col bg-white dark:bg-[#1e1f20] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-1.5 text-xs select-none overflow-hidden animate-in fade-in zoom-in-95 duration-100"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="overflow-y-auto win-scrollbar p-0.5 max-h-[330px] flex flex-col gap-0.5">
            {items ? (
              items.map((item, idx) => {
                if (item.isDivider) {
                  return null;
                }
                return (
                  <button
                    key={item.id || idx}
                    type="button"
                    title={item.label || item.name}
                    onClick={() => {
                      setIsOpen(false);
                      if (item.onClick) item.onClick();
                      else if (item.href) router.push(item.href);
                    }}
                    className={`w-full text-left px-3 h-9 flex items-center gap-2.5 hover:bg-slate-100 dark:hover:bg-slate-800/80 active:bg-slate-200 dark:active:bg-slate-700 transition-colors cursor-pointer text-xs rounded-xl min-w-0 overflow-hidden font-medium select-none ${
                      item.isActive
                        ? 'bg-blue-50 text-google-blue dark:bg-blue-950/50 dark:text-blue-300'
                        : 'text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {item.icon ? (
                      <span className="w-5 h-5 flex items-center justify-center shrink-0">{item.icon}</span>
                    ) : (
                      <span className="w-5 h-5 flex items-center justify-center shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500" />
                      </span>
                    )}
                    <span className="truncate whitespace-nowrap min-w-0 flex-1">{item.label || item.name}</span>
                    {item.isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-google-blue shrink-0 ml-1" />
                    )}
                  </button>
                );
              })
            ) : subfolders.length === 0 && subfiles.length === 0 ? (
              <div className="px-3 py-2 text-xs text-slate-400 dark:text-slate-500 text-center whitespace-nowrap">
                Thư mục trống
              </div>
            ) : (
              <>
                {subfolders.map((folder) => (
                  <button
                    key={folder.id}
                    type="button"
                    title={folder.name}
                    onClick={() => {
                      setIsOpen(false);
                      if (onNavigateFolder) onNavigateFolder(folder.id);
                      else {
                        if (typeof window !== 'undefined') {
                          sessionStorage.setItem('app_active_folder_id', folder.id);
                          sessionStorage.setItem('app_active_folder_name', folder.name);
                        }
                        router.push('/app/documents');
                      }
                    }}
                    className="w-full text-left px-3 h-9 flex items-center gap-2.5 hover:bg-slate-100 dark:hover:bg-slate-800/80 active:bg-slate-200 dark:active:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer text-xs rounded-xl min-w-0 overflow-hidden font-medium select-none"
                  >
                    <span className="w-5 h-5 flex items-center justify-center shrink-0">
                      <Folder size={15} className="text-amber-500 fill-amber-500/20" />
                    </span>
                    <span className="truncate whitespace-nowrap min-w-0 flex-1">{folder.name}</span>
                  </button>
                ))}

                {subfiles.map((file) => {
                  const cleanDisplayName = file.name.replace(/\.(docx|pdf|txt|xlsx|doc|json)$/i, '');
                  return (
                    <button
                      key={file.id}
                      type="button"
                      title={file.name}
                      onClick={() => {
                        setIsOpen(false);
                        if (onNavigateFile) onNavigateFile(file.id);
                        else router.push(`/app/documents/${file.id}`);
                      }}
                      className="w-full text-left px-3 h-9 flex items-center gap-2.5 hover:bg-slate-100 dark:hover:bg-slate-800/80 active:bg-slate-200 dark:active:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer text-xs rounded-xl min-w-0 overflow-hidden font-medium select-none"
                    >
                      <span className="w-5 h-5 flex items-center justify-center shrink-0">
                        <FileText size={15} className="text-blue-500" />
                      </span>
                      <span className="truncate whitespace-nowrap min-w-0 flex-1">{cleanDisplayName}</span>
                    </button>
                  );
                })}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
