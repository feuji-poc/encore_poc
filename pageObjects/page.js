module.exports = class Page {
    open() {
      return global.page.goto(`https://navigator.training.psav.com/`);
    }
    navigator(path){
      return global.page.goto(`https://navigator.training.psav.com/${path}`);
    }
    
};