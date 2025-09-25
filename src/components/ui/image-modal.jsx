import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { Button } from './button';

const ImageModal = ({ isOpen, onClose, imageSrc, imageAlt = "이미지" }) => {
  const handleEscapeKey = useCallback((event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscapeKey]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-modal-title"
    >
      <div
        className="relative max-w-4xl max-h-full bg-white rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="secondary"
            size="icon"
            onClick={onClose}
            className="rounded-full bg-white/90 hover:bg-white shadow-md"
            aria-label="닫기"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="max-w-full max-h-[80vh] object-contain mx-auto rounded-md"
            id="image-modal-title"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;