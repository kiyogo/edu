'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '../components/ThemeToggle';
import { useAuthStore } from '../store/useAuthStore';
import { SimpleQuizCanvas, SimpleTrophyCanvas } from '../components/home/DetailedEduCanvas';
import { Play, Sparkles } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0c0f17] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white transition-colors duration-200 flex flex-col justify-between">
      
      {/* ----------------- HEADER (Chỉ có Logo, Nút Vào phòng & Đăng nhập) ----------------- */}
      <header className="sticky top-0 z-40 bg-white dark:bg-[#0c0f17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          
          {/* Logo KiyoEdu (Không có viền mờ, không đổ bóng mờ) */}
          <div
            onClick={() => router.push('/')}
            className="cursor-pointer select-none flex items-center gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
              <Sparkles size={20} />
            </div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
              KiyoEdu
            </span>
          </div>

          {/* Action Buttons: ThemeToggle + Nút Vào phòng + Nút Đăng nhập (nếu chưa đăng nhập, TUYỆT ĐỐI không có nút Đăng xuất) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            {/* Nút Vào phòng: Chuyển trực tiếp sang trang /play, không viền mờ */}
            <button
              type="button"
              onClick={() => router.push('/play')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm px-4 py-2 sm:py-2.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <Play size={14} fill="currentColor" />
              <span>Vào phòng</span>
            </button>

            {/* Nút Đăng nhập: Chỉ hiện khi chưa đăng nhập, không có nút Đăng xuất, không viền mờ */}
            {!isAuthenticated && (
              <button
                type="button"
                onClick={() => router.push('/login')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-all cursor-pointer active:scale-95"
              >
                Đăng nhập
              </button>
            )}
          </div>

        </div>
      </header>

      {/* ----------------- HERO SECTION ----------------- */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-16 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-center">
          
          {/* Left Canvas: Sắc nét, hoàn toàn không viền mờ */}
          <div className="lg:col-span-4 flex justify-center order-2 lg:order-1">
            <SimpleQuizCanvas />
          </div>

          {/* Center Column: Chỉ có Tiêu đề & Nút Vào phòng */}
          <div className="lg:col-span-4 space-y-7 order-1 lg:order-2 px-2">
            
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-black text-slate-900 dark:text-white leading-[1.2] tracking-tight">
              Học mà chơi <br />
              Chơi mà học
            </h1>

            {/* Nút Vào phòng: Chuyển trực tiếp sang trang /play, sắc nét, không viền mờ */}
            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={() => router.push('/play')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-black text-base px-8 py-3.5 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
              >
                <Play size={16} fill="currentColor" />
                <span>Vào phòng</span>
              </button>
            </div>

          </div>

          {/* Right Canvas: Sắc nét, hoàn toàn không viền mờ */}
          <div className="lg:col-span-4 flex justify-center order-3">
            <SimpleTrophyCanvas />
          </div>

        </div>
      </main>

    </div>
  );
}
