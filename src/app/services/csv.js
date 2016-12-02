class CSV {
  static export(array) {
    if (array.length === 0) {
      return null;
    }

    let content = '';
    const keys = Object.keys(array[0]);
    array.forEach(x => {
      keys.forEach(key => {
        content += `${x[key]};`;
      });
      content += '\n';
    });
    return content;
  }
}

export default CSV;
