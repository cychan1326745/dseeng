#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Vocabulary Markdown Editor - Tick learned words
- Load markdown vocabulary file (format: ### word (pos) explanation...)
- Display all words in a list
- Checkbox to mark "learned" / "not learned"
- Save changes back to markdown file
- Works with kelly-wordbank / jenny-wordbank / nash-wordbank format

Author: Hermes
"""

import sys
import os
import re
from PyQt5.QtWidgets import (
    QApplication, QMainWindow, QWidget, QVBoxLayout, QHBoxLayout,
    QListWidget, QCheckBox, QListWidgetItem, QPushButton, QFileDialog,
    QLabel, QGroupBox, QScrollArea, QStatusBar, QMessageBox
)
from PyQt5.QtCore import Qt

class WordItem:
    """Store word information parsed from markdown"""
    def __init__(self, raw_line):
        self.raw_line = raw_line
        self.learned = False
        self.word = ""
        self.extract_word()
    
    def extract_word(self):
        """Extract word from line: ### word (pos) ..."""
        if not self.raw_line.startswith('###'):
            return
        # Get word part before (pos)
        match = re.match(r'^###\s+([^(]+)', self.raw_line)
        if match:
            self.word = match.group(1).strip()
    
    def is_header(self):
        return self.raw_line.startswith('###')

class VocabEditorWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.file_path = None
        self.lines = []
        self.word_items = []
        
        self.init_ui()
    
    def init_ui(self):
        self.setWindowTitle('Vocabulary Markdown Editor - Tick Learned Words')
        self.setGeometry(100, 100, 800, 700)
        
        # Central widget
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        main_layout = QVBoxLayout()
        
        # File selection area
        file_group = QGroupBox("Vocabulary File")
        file_layout = QHBoxLayout()
        
        self.file_label = QLabel("No file loaded")
        file_layout.addWidget(self.file_label)
        
        open_btn = QPushButton("Open MD File")
        open_btn.clicked.connect(self.open_file)
        file_layout.addWidget(open_btn)
        
        save_btn = QPushButton("Save Changes")
        save_btn.clicked.connect(self.save_file)
        file_layout.addWidget(save_btn)
        
        file_group.setLayout(file_layout)
        main_layout.addWidget(file_group)
        
        # Stats area
        stats_layout = QHBoxLayout()
        self.total_label = QLabel("Total: 0 words")
        self.learned_label = QLabel("Learned: 0 words")
        stats_layout.addWidget(self.total_label)
        stats_layout.addWidget(self.learned_label)
        self.unlearned_label = QLabel("Unlearned: 0 words")
        stats_layout.addWidget(self.unlearned_label)
        main_layout.addLayout(stats_layout)
        
        # Word list with checkboxes
        self.list_widget = QListWidget()
        self.list_widget.setSelectionMode(QListWidget.NoSelection)
        main_layout.addWidget(self.list_widget)
        
        # Filter buttons
        filter_layout = QHBoxLayout()
        show_all_btn = QPushButton("Show All")
        show_all_btn.clicked.connect(lambda: self.filter_words("all"))
        filter_layout.addWidget(show_all_btn)
        
        show_unlearned_btn = QPushButton("Show Only Unlearned")
        show_unlearned_btn.clicked.connect(lambda: self.filter_words("unlearned"))
        filter_layout.addWidget(show_unlearned_btn)
        
        show_learned_btn = QPushButton("Show Only Learned")
        show_learned_btn.clicked.connect(lambda: self.filter_words("learned"))
        filter_layout.addWidget(show_learned_btn)
        
        main_layout.addLayout(filter_layout)
        
        central_widget.setLayout(main_layout)
        
        self.status_bar = QStatusBar()
        self.setStatusBar(self.status_bar)
    
    def parse_markdown(self, content):
        """Parse markdown content into word items"""
        lines = content.split('\n')
        self.lines = lines
        self.word_items = []
        
        for line in lines:
            if line.startswith('###'):
                # Extract word
                match = re.match(r'^###\s+([^(]+)', line)
                word = ""
                if match:
                    word = match.group(1).strip()
                # Check if marked as learned
                # Look for ✅ or [x] or "learned" marker
                learned = False
                if '✅' in line or '[x]' in line or '*learned*' in line:
                    learned = True
                self.word_items.append({
                    'line_index': None,  # We'll fill this later
                    'raw': line,
                    'word': word,
                    'learned': learned
                })
        
        # Match line indices
        idx = 0
        for i, line in enumerate(lines):
            if line.startswith('###'):
                if idx < len(self.word_items):
                    self.word_items[idx]['line_index'] = i
                    idx += 1
        
        self.update_stats()
        return True
    
    def rebuild_word_list(self):
        """Rebuild the Qt list widget"""
        self.list_widget.clear()
        for item in self.word_items:
            list_item = QListWidgetItem()
            widget = QWidget()
            layout = QHBoxLayout()
            checkbox = QCheckBox(item['word'])
            checkbox.setChecked(item['learned'])
            checkbox.stateChanged.connect(lambda state, it=item: self.on_checkbox_changed(state, it))
            layout.addWidget(checkbox)
            widget.setLayout(layout)
            list_item.setSizeHint(widget.sizeHint())
            self.list_widget.addItem(list_item)
            self.list_widget.setItemWidget(list_item, widget)
    
    def on_checkbox_changed(self, state, item):
        item['learned'] = (state == Qt.Checked)
        self.update_stats()
    
    def update_stats(self):
        total = len(self.word_items)
        learned = sum(1 for item in self.word_items if item['learned'])
        unlearned = total - learned
        self.total_label.setText(f"Total: {total} words")
        self.learned_label.setText(f"Learned: {learned} words")
        self.unlearned_label.setText(f"Unlearned: {unlearned} words")
    
    def filter_words(self, filter_type):
        """Filter the list display"""
        self.list_widget.clear()
        for item in self.word_items:
            if filter_type == "all" or \
               (filter_type == "learned" and item['learned']) or \
               (filter_type == "unlearned" and not item['learned']):
                list_item = QListWidgetItem()
                widget = QWidget()
                layout = QHBoxLayout()
                checkbox = QCheckBox(item['word'])
                checkbox.setChecked(item['learned'])
                checkbox.stateChanged.connect(lambda state, it=item: self.on_checkbox_changed(state, it))
                layout.addWidget(checkbox)
                widget.setLayout(layout)
                list_item.setSizeHint(widget.sizeHint())
                self.list_widget.addItem(list_item)
                self.list_widget.setItemWidget(list_item, widget)
    
    def open_file(self):
        file_path, _ = QFileDialog.getOpenFileName(
            self, "Open Vocabulary Markdown File", "", "Markdown Files (*.md);;All Files (*)"
        )
        if not file_path:
            return
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            self.file_path = file_path
            self.file_label.setText(os.path.basename(file_path))
            self.parse_markdown(content)
            self.rebuild_word_list()
            self.status_bar.showMessage(f"Loaded {len(self.word_items)} words from {os.path.basename(file_path)}")
        except Exception as e:
            QMessageBox.critical(self, "Error", f"Failed to open file:\n{str(e)}")
    
    def save_file(self):
        """Save changes back to markdown file"""
        if self.file_path is None:
            QMessageBox.warning(self, "Warning", "No file loaded")
            return
        
        try:
            # Rebuild the full content with updated learned markers
            new_lines = self.lines.copy()
            for item in self.word_items:
                idx = item['line_index']
                if idx is None or idx >= len(new_lines):
                    continue
                original_line = item['raw']
                # Remove existing markers
                line_clean = original_line
                line_clean = line_clean.replace('✅', '').replace('[x]', '').replace('[ ]', '').replace('*learned*', '').strip()
                # Add marker if learned
                if item['learned']:
                    line_clean = line_clean + ' ✅'
                new_lines[idx] = line_clean
            
            # Join and save
            new_content = '\n'.join(new_lines)
            
            # Backup original
            backup_path = self.file_path + '.backup'
            with open(backup_path, 'w', encoding='utf-8') as f:
                f.write('\n'.join(self.lines))
            
            with open(self.file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            total_learned = sum(1 for item in self.word_items if item['learned'])
            self.status_bar.showMessage(f"Saved successfully! {total_learned}/{len(self.word_items)} words marked as learned. Backup saved to {os.path.basename(backup_path)}")
            QMessageBox.information(
                self, "Saved",
                f"Changes saved successfully!\n\n"
                f"Total words: {len(self.word_items)}\n"
                f"Learned: {total_learned}\n"
                f"Unlearned: {len(self.word_items) - total_learned}\n\n"
                f"Backup saved to:\n{backup_path}"
            )
        
        except Exception as e:
            QMessageBox.critical(self, "Error", f"Failed to save file:\n{str(e)}")

def main():
    app = QApplication(sys.argv)
    window = VocabEditorWindow()
    window.show()
    sys.exit(app.exec_())

if __name__ == '__main__':
    main()