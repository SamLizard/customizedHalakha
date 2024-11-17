const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error'];
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}

const tagsColors: object = {
  "shabbat": "red",
  "yomTov": "blue",
  "erouv": "green"
};

const getTagColor = (tagKey: string): string => {
  return tagsColors[tagKey] || getRandomColor();
};

export {
  getTagColor,
};