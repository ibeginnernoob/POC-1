import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
    texts: string[];
    className?: string;
}

function LandingTypewriter({ texts, className = '' }: TypewriterTextProps) {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const currentFullText = texts[currentTextIndex];

        if (isTyping) {
            if (charIndex < currentFullText.length) {
                const timer = setTimeout(() => {
                    setCurrentText(currentFullText.slice(0, charIndex + 1));
                    setCharIndex(charIndex + 1);
                }, 100);
                return () => clearTimeout(timer);
            } else {
                // Finished typing, wait then start deleting
                const timer = setTimeout(() => {
                    setIsTyping(false);
                }, 2000);
                return () => clearTimeout(timer);
            }
        } else {
            if (charIndex > 0) {
                const timer = setTimeout(() => {
                    setCurrentText(currentFullText.slice(0, charIndex - 1));
                    setCharIndex(charIndex - 1);
                }, 50);
                return () => clearTimeout(timer);
            } else {
                // Finished deleting, move to next text
                const timer = setTimeout(() => {
                    setCurrentTextIndex((prev) => (prev + 1) % texts.length);
                    setIsTyping(true);
                }, 500);
                return () => clearTimeout(timer);
            }
        }
    }, [charIndex, isTyping, currentTextIndex, texts]);

    return (
        <span className={className}>
            {currentText}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{
                    duration: 0.8,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'reverse',
                }}
                className="inline-block w-0.5 h-[0.8em] bg-current ml-1"
            />
        </span>
    );
}

export default LandingTypewriter;
