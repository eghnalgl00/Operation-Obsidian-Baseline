module.exports = async (tp) => {
  const today = tp.date.now("YYYY-MM-DD");
  const folder = "Daily_Logs";
  const filename = `${folder}/${today}.md`;

  if (!(await tp.file.exists(filename))) {
    const tpl = tp.file.find_tfile("Daily_Log_Template.md");
    if (!tpl) {
      new Notice("Templater: Daily_Log_Template.md not found in Templates folder.");
      return;
    }
    await tp.file.create_new(tpl, filename);
  }
};
