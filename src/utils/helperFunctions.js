const parseMarkdown = (text) => {
  // Bold
  text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  // Italics
  text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");
  // Underline
  text = text.replace(/__(.*?)__/g, "<u>$1</u>");
  // Strikethrough
  text = text.replace(/~~(.*?)~~/g, "<s>$1</s>");
  // List item with * or -
  text = text.replace(/^\s*([-*])\s*(.*)$/gm, "<li>$2</li>");
  // Wrap list items in <ul> tag
  text = text.replace(/<\/li>\n/g, "</li>");
  text = `<ul>${text}</ul>`;
  return text;
};

export { parseMarkdown };
