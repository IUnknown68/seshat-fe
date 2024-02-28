import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const sanitizeHtmlSettings = {
  allowedTags: [
    'b', 'p', 'i', 'u', 'li', 'ul', 'ol', 'strong', 'blockquote', 'a',
  ],
  allowedAttributes: {
    a: ['href'],
  },
};

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
});

md.linkify.set({ target: '_blank' });

//------------------------------------------------------------------------------
// Allow any html by default - trust source.
function sanitize(src, checkHtml) {
  return checkHtml
    ? md.render(sanitizeHtml(src, sanitizeHtmlSettings))
    : md.render(src);
}

export default sanitize;
