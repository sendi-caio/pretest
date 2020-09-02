module.exports = {
  apps : [
    {
      name: "pretest",
      script: "node .",
      watch: ["models", "index.js", "views"],
      ignore_watch : ["uploads"],
    }
  ],
};
