"use client"
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SVGclose from '../icons/SVGclose';

type Props = {
  children?: React.ReactNode;
  isOpen: boolean;      // Нужно знать, открыто ли окно
  onClose: () => void;  // Функция для закрытия
  header?: string;
  SVGHeader?: React.ReactNode;
};

function ModalWindow({ children, isOpen, onClose, header, SVGHeader }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* 1. Backdrop (Затемнение фона) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose} // Закрыть при клике на фон
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* 2. Контентное окно */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white p-6 rounded-2xl shadow-xl min-w-[300px] overflow-auto max-h-[90vh] max-w-[90vw] z-[101]"
          >
            {/* Кнопка закрытия (крестик) */}
            {header
              ?
              <div className='flex justify-between mb-2 pb-2 border-b border-gray-400 '>
                <span className='text-2xl flex items-center gap-2'>{SVGHeader}{header}</span>
                <button
                  onClick={onClose}
                  className="cursor-pointer text-gray-500 hover:text-black"
                >
                  <SVGclose clas="w-6 h-6" />
                </button>
              </div>
              : <button
                onClick={onClose}
                className="absolute cursor-pointer top-4 right-4 text-gray-500 hover:text-black"
              >
                <SVGclose clas="w-6 h-6" />
              </button>
            }

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ModalWindow;
