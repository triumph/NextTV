"use client";

import { useEffect, useCallback } from "react";
import { DanmakuSearch } from "@/components/DanmakuSearch";

const NOOP = () => {};

export function DanmakuSearchModal({ isOpen, onClose, initialTitle, onEpisodeConfirm }) {

  // ESC 键关闭
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // 防止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleEpisodeSelect = useCallback((episodeId) => {
    onEpisodeConfirm?.(episodeId);
    // 选集后短暂延迟关闭，让用户看到选中状态
    setTimeout(() => {
      onClose();
    }, 400);
  }, [onEpisodeConfirm, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="danmaku-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="danmaku-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* 关闭按钮 */}
        <button
          className="danmaku-modal-close"
          onClick={onClose}
          aria-label="关闭"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* DanmakuSearch 复用 */}
        <div className="danmaku-modal-body">
          <DanmakuSearch
            initialTitle={initialTitle || ""}
            onEpisodeSelect={handleEpisodeSelect}
            onAnimeSelect={NOOP}
          />
        </div>
      </div>
    </div>
  );
}
