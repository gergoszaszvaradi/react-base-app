const fs = require("fs");
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const question = require("util").promisify(readline.question).bind(readline);

(async () => {
    try {
        console.log("📃  Configuring project...");
        console.log("Note: Once the configuration is done, the 'configure' script and js file will be removed.\n");

        const package = JSON.parse(fs.readFileSync("package.json"));

        package.name = package.description = await question("Project name: ");
        package.author = await question("Project author: ");
        package.repository = await question("Project repository: ");
        readline.close();

        delete package.scripts["configure"];

        fs.writeFileSync("package.json", JSON.stringify(package, null, 4));
        fs.rmSync("_configure.js");

        console.log("\n🎉  Project configured successfully!");
    } catch (e) {
        console.error("\n❌  Project configuration failed...");
        console.error(e);
    }
})();