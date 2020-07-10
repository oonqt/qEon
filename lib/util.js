const config = require("../config.json")

module.exports.getWelcome = (data, member) => {
    const replacements = {
      '%COUNT%': data.count,
      '%MEMBER%': data.user
    }

    return config.plugins.welcomer.message.replace(/%\w+%/g, (all) => {
      return typeof replacements[all] !== 'undefined' ? replacements[all] : all
    })
  } 
