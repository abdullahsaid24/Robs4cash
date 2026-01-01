import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useSiteContentContext } from '../../contexts/SiteContentContext';
import { Edit2, X, Check } from 'lucide-react';

interface EditableTextProps {
    section: string;
    field: string;
    value: string;
    className?: string; // To merge classes
    as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'; // Semantic tag
    multiline?: boolean;
}

const EditableText: React.FC<EditableTextProps> = ({
    section,
    field,
    value,
    className = '',
    as = 'span',
    multiline = false,
}) => {
    const { isAdmin } = useAuth();
    const { isEditing, updateContent } = useSiteContentContext();
    const [isHovered, setIsHovered] = useState(false);
    const [isEditingField, setIsEditingField] = useState(false);
    const [tempValue, setTempValue] = useState(value);

    // If not admin or not in edit mode, just render text
    if (!isAdmin || !isEditing) {
        const Tag = as as any;
        return <Tag className={className}>{value}</Tag>;
    }

    const handleSave = async () => {
        await updateContent(section as any, field, tempValue);
        setIsEditingField(false);
    };

    const handleCancel = () => {
        setTempValue(value);
        setIsEditingField(false);
    };

    const Tag = as as any;

    if (isEditingField) {
        return (
            <div className="relative inline-block w-full max-w-full z-50">
                {multiline ? (
                    <textarea
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="w-full bg-white text-black p-2 rounded shadow-lg outline-none border-2 border-brand-green min-h-[100px] text-lg"
                        autoFocus
                    />
                ) : (
                    <input
                        type="text"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="w-full bg-white text-black p-2 rounded shadow-lg outline-none border-2 border-brand-green"
                        autoFocus
                    />
                )}
                <div className="absolute -bottom-10 right-0 flex gap-2">
                    <button
                        onClick={handleCancel}
                        className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                        title="Cancel"
                    >
                        <X size={16} />
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-brand-green text-brand-dark p-1 rounded-full hover:brightness-110 transition-colors shadow-lg"
                        title="Save"
                    >
                        <Check size={16} />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsEditingField(true)}
            className={`relative inline-block cursor-pointer border-2 border-dashed rounded transition-all duration-200 ${isHovered ? 'border-brand-green bg-brand-green/10' : 'border-transparent'
                }`}
            title="Click to edit"
        >
            <Tag className={`${className} pointer-events-none`}>{value}</Tag>
            {isHovered && (
                <div className="absolute -top-3 -right-3 bg-brand-green text-brand-dark p-1 rounded-full shadow-lg scale-75">
                    <Edit2 size={12} />
                </div>
            )}
        </div>
    );
};

export default EditableText;
