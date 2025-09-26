import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import {
  Bold, Italic, Underline as UnderlineIcon, Heading1, Heading2, List, ListOrdered, Quote, Link as LinkIcon,
} from 'lucide-react';

interface TiptapEditorProps {
  value: string;
  onChange: (value: string) => void;
  isEditable: boolean;
}

interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
}

export const TiptapEditor: React.FC<TiptapEditorProps> = ({ value, onChange, isEditable }) => {
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({ visible: false, x: 0, y: 0 });
  const [isScrollable, setIsScrollable] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-indigo-600 underline hover:text-indigo-800',
        },
      }),
    ],
    content: value,
    editable: isEditable,
      editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg focus:outline-none p-6',
      },
      handleDOMEvents: {
        contextmenu: (view, event) => {
            if (isEditable) {
            event.preventDefault();
            const position = getOptimalMenuPosition(event as MouseEvent);
            setContextMenu({
              visible: true,
              x: position.x,
              y: position.y,
            });
            return true;
          }
          return false;
        },
        click: () => {
          setContextMenu({ visible: false, x: 0, y: 0 });
          return false;
        },
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });
  
  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable);
      const checkScrollable = () => {
        const editorElement = editor.view.dom;
        if (editorElement) {
          const hasVerticalScrollbar = editorElement.scrollHeight > editorElement.clientHeight;
          setIsScrollable(hasVerticalScrollbar);
        }
      };
      
      const resizeObserver = new ResizeObserver(checkScrollable);
      if (editor.view.dom) {
        resizeObserver.observe(editor.view.dom);
      }
      
      editor.on('update', checkScrollable);
      editor.on('focus', checkScrollable);
      editor.on('blur', checkScrollable);
      
      setTimeout(checkScrollable, 200);
      
      return () => {
        editor.off('update', checkScrollable);
        editor.off('focus', checkScrollable);
        editor.off('blur', checkScrollable);
        resizeObserver.disconnect();
      };
    }
  }, [isEditable, editor]);

  useEffect(() => {
    const handleClickOutside = () => {
      setContextMenu({ visible: false, x: 0, y: 0 });
    };

    if (contextMenu.visible) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [contextMenu.visible]);

  const handleLinkInsert = useCallback(() => {
    if (!editor) return;
    
    const { from, to } = editor.state.selection;
    const hasSelection = from !== to;
    
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run();
    } else {
      if (hasSelection) {
        const url = prompt('Enter URL:');
        if (url) {
          editor.chain().focus().setLink({ href: url }).run();
        }
      } else {
        alert('Please select text first to add a link');
      }
    }
    setContextMenu({ visible: false, x: 0, y: 0 });
  }, [editor]);

  const getOptimalMenuPosition = useCallback((event: MouseEvent) => {
    const menuWidth = 200;
    const menuHeight = 280;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const margin = 15; 
    const bottomBuffer = 50; 

    const x = event.clientX;
    const y = event.clientY;

    if (x + menuWidth <= viewportWidth - margin && y + menuHeight <= viewportHeight - bottomBuffer) {
      return { x, y };
    }
    if (x - menuWidth >= margin && y + menuHeight <= viewportHeight - bottomBuffer) {
      return { x: x - menuWidth, y };
    }
    if (x + menuWidth <= viewportWidth - margin && y - menuHeight >= margin) {
      return { x, y: y - menuHeight - 5 };
    }
    if (x - menuWidth >= margin && y - menuHeight >= margin) {
      return { x: x - menuWidth, y: y - menuHeight - 5 };
    }
  const availableSpaceBelow = viewportHeight - y - bottomBuffer;
  const availableSpaceAbove = y - margin;
    
    let finalX = x;
    let finalY = y;
    
    if (x + menuWidth > viewportWidth - margin) {
      finalX = Math.max(margin, viewportWidth - menuWidth - margin);
    }
    if (availableSpaceAbove > availableSpaceBelow || availableSpaceBelow < menuHeight) {
      finalY = Math.max(margin, y - menuHeight - 5);
    } else {
      finalY = Math.min(y, viewportHeight - menuHeight - bottomBuffer);
    }

    return { x: finalX, y: finalY };
  }, []);

  const handleContextMenuAction = useCallback((action: () => void) => {
    action();
    setContextMenu({ visible: false, x: 0, y: 0 });
  }, []);


  if (!editor) return null;

  return (
    <div className="rounded-xl overflow-hidden relative editor-container" style={{backgroundColor:'var(--surface)', border: '1px solid var(--border)'}}>
      {isEditable && (
  <div className="flex flex-wrap gap-2 p-3" style={{borderBottom: '1px solid #DBE3E5', backgroundColor:'var(--input-bg)'}}>
            <ToolbarButton
            active={editor?.isActive('bold') || false}
            onClick={() => editor?.chain().focus().toggleBold().run()}
            icon={<Bold size={16} />}
            label="Bold"
            />
            <ToolbarButton
            active={editor?.isActive('italic') || false}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            icon={<Italic size={16} />}
            label="Italic"
            />
            <ToolbarButton
            active={editor?.isActive('underline') || false}
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            icon={<UnderlineIcon size={16} />}
            label="Underline"
            />
            
            <div className="w-px h-6 mx-1" style={{backgroundColor:'#DBE3E5'}} />
            
            <ToolbarButton
            active={editor?.isActive('heading', { level: 1 }) || false}
            onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
            icon={<Heading1 size={16} />}
            label="H1"
            />
            <ToolbarButton
            active={editor?.isActive('heading', { level: 2 }) || false}
            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
            icon={<Heading2 size={16} />}
            label="H2"
            />
            
            <div className="w-px h-6 mx-1" style={{backgroundColor:'#DBE3E5'}} />
            
            <ToolbarButton
            active={editor?.isActive('bulletList') || false}
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            icon={<List size={16} />}
            label="Bullet List"
            />
            <ToolbarButton
            active={editor?.isActive('orderedList') || false}
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            icon={<ListOrdered size={16} />}
            label="Ordered List"
            />
            
            <div className="w-px h-6 mx-1" style={{backgroundColor:'#DBE3E5'}} />
            
            <ToolbarButton
            active={editor?.isActive('blockquote') || false}
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
            icon={<Quote size={16} />}
            label="Quote"
            />
            <ToolbarButton
            active={editor?.isActive('link') || false}
            onClick={handleLinkInsert}
            icon={<LinkIcon size={16} />}
            label="Add Link"
            />
        </div>
      )}
  <div className="relative min-h-[300px] max-h-[450px] overflow-y-auto scrollbar-thin" style={{backgroundColor:'var(--surface)', borderTop:'1px solid #DBE3E5', color:'var(--text-primary)'}}>
        <EditorContent editor={editor} />
        
        
        {isScrollable && (
          <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-medium opacity-75 pointer-events-none" style={{backgroundColor:'var(--input-bg)', color:'var(--text-primary)', border:'1px solid #DBE3E5'}}>
            ↕ Scroll for more content
          </div>
        )}
        
        
        {contextMenu.visible && isEditable && editor && (
          <div
            className="fixed z-50 rounded-lg shadow-xl py-2 min-w-[180px] max-w-[200px] animate-in fade-in-0 zoom-in-95 duration-200"
            style={{
              left: `${contextMenu.x}px`,
              top: `${contextMenu.y}px`,
              backgroundColor: 'var(--surface)',
              border: '1px solid #DBE3E5',
              color: 'var(--text-primary)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            
            <div className="px-2 pb-1">
              <div className="text-xs font-medium mb-1" style={{color:'var(--muted)'}}>Text Format</div>
              <div className="grid grid-cols-3 gap-1">
                <ContextMenuIconButton
                  icon={<Bold size={16} />}
                  onClick={() => handleContextMenuAction(() => editor.chain().focus().toggleBold().run())}
                  active={editor.isActive('bold')}
                  title="Bold"
                />
                <ContextMenuIconButton
                  icon={<Italic size={16} />}
                  onClick={() => handleContextMenuAction(() => editor.chain().focus().toggleItalic().run())}
                  active={editor.isActive('italic')}
                  title="Italic"
                />
                <ContextMenuIconButton
                  icon={<UnderlineIcon size={16} />}
                  onClick={() => handleContextMenuAction(() => editor.chain().focus().toggleUnderline().run())}
                  active={editor.isActive('underline')}
                  title="Underline"
                />
              </div>
            </div>
            
            <div className="border-t my-2" style={{borderTop:'1px solid var(--border)'}} />
            
            
            <div className="px-2 pb-1">
              <div className="text-xs font-medium mb-1" style={{color:'var(--muted)'}}>Headings</div>
              <ContextMenuItem
                icon={<Heading1 size={14} />}
                label="Heading 1"
                onClick={() => handleContextMenuAction(() => editor.chain().focus().toggleHeading({ level: 1 }).run())}
                active={editor.isActive('heading', { level: 1 })}
              />
              <ContextMenuItem
                icon={<Heading2 size={14} />}
                label="Heading 2"
                onClick={() => handleContextMenuAction(() => editor.chain().focus().toggleHeading({ level: 2 }).run())}
                active={editor.isActive('heading', { level: 2 })}
              />
            </div>
            
            <div className="border-t my-2" style={{borderTop:'1px solid var(--border)'}} />
            
            
            <div className="px-2 pb-1">
              <div className="text-xs font-medium mb-1" style={{color:'var(--muted)'}}>Lists & More</div>
              <ContextMenuItem
                icon={<List size={14} />}
                label="Bullet List"
                onClick={() => handleContextMenuAction(() => editor.chain().focus().toggleBulletList().run())}
                active={editor.isActive('bulletList')}
              />
              <ContextMenuItem
                icon={<ListOrdered size={14} />}
                label="Numbered List"
                onClick={() => handleContextMenuAction(() => editor.chain().focus().toggleOrderedList().run())}
                active={editor.isActive('orderedList')}
              />
              <ContextMenuItem
                icon={<Quote size={14} />}
                label="Quote"
                onClick={() => handleContextMenuAction(() => editor.chain().focus().toggleBlockquote().run())}
                active={editor.isActive('blockquote')}
              />
              <ContextMenuItem
                icon={<LinkIcon size={14} />}
                label={editor.isActive('link') ? 'Remove Link' : 'Add Link'}
                onClick={handleLinkInsert}
                active={editor.isActive('link')}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

type ToolbarButtonProps = {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
};

function ToolbarButton({ active, onClick, icon, label }: ToolbarButtonProps) {
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  }, [onClick]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`
        flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium 
        transition-all duration-100 ease-out select-none
        ${active 
          ? 'text-zinc-900 border shadow-sm transform scale-[0.98]' 
          : 'text-zinc-600 hover:transform hover:scale-[1.02]'
        }
        active:scale-95 active:transform
      `}
      title={label}
    >
      {icon}
    </button>
  );
}

type ContextMenuItemProps = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
};

function ContextMenuItem({ icon, label, onClick, active = false }: ContextMenuItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full flex items-center gap-2 px-2 py-1.5 text-sm text-left rounded 
        transition-all duration-150 ease-out
        ${active 
          ? 'text-indigo-700 scale-[0.98]' 
          : 'text-zinc-700 hover:bg-zinc-100 hover:scale-[1.02]'
        }
        active:scale-95
      `}
    >
      {icon}
      {label}
    </button>
  );
}

type ContextMenuIconButtonProps = {
  icon: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  title: string;
};

function ContextMenuIconButton({ icon, onClick, active = false, title }: ContextMenuIconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`
        flex items-center justify-center w-8 h-8 rounded 
        transition-all duration-150 ease-out
        ${active 
          ? 'text-zinc-900 scale-[0.95]' 
          : 'text-zinc-600 hover:bg-zinc-100 hover:scale-110'
        }
        active:scale-90
      `}
    >
      {icon}
    </button>
  );
}