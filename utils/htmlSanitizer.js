export function htmlSanitizer(dirtyHtml) {
    // Список запрещенных тегов
    const forbiddenTags = ['script', 'iframe', 'style', 'link', 'meta', 'object', 'embed'];

    // Удаление запрещенных тегов
    forbiddenTags.forEach(tag => {
        const tagRegex = new RegExp(`</?${tag}\\b[^>]*>`, 'gi');
        dirtyHtml = dirtyHtml.replace(tagRegex, '');
    });

    // Список тегов, которые нужно проверять на "пустоту"
    const tagsToCheckForEmptyContent = ['p', 'li', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'strong', 'em', 'i', 'b', 'u'];

    // Удаление пустых тегов
    tagsToCheckForEmptyContent.forEach(tag => {
        const regex = new RegExp(`<${tag}\\b[^>]*>(.*?)</${tag}>`, 'gi');
        dirtyHtml = dirtyHtml.replace(regex, (match, content) => {
            // Если содержимое тега не пустое (учитывая пробелы), оставляем его
            return content.trim() ? match : '';
        });
    });

    // Удаление inline JavaScript атрибутов (on* events)
    dirtyHtml = dirtyHtml.replace(/\son[a-zA-Z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]*)/gi, '');

    // Дополнительно: удаление лишних пробелов между тегами
    dirtyHtml = dirtyHtml.replace(/>\s+</g, '><');

    return dirtyHtml;
}