const fs = require("fs/promises");
const path = require("path");
const { homedir } = require("os");
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const { exec } = require("child_process");
const question = require("util").promisify(readline.question).bind(readline);

const cmd = (command, printError = true) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error && printError)
                console.error(error);
            resolve(stdout ? stdout : stderr);
        })
    });
}

const simplify = (str) => str.toLowerCase().replace(/[^A-Za-z0-9-_.]/, "").replace(/ +/g, "-");

const VARIABLES = {};
const substitute = async (dir) => {
    for (const fileName of await fs.readdir(dir)) {
        const filePath = path.join(dir, fileName);

        if ((await fs.stat(filePath)).isDirectory()) {
            await substitute(filePath);
            continue;
        }

        if (![".js", ".jsx", ".ts", ".tsx", ".json", ".yml", ".yaml", ".html", ".css", ".scss"].includes(path.extname(filePath)))
            continue;
        
        let content = (await fs.readFile(filePath)).toString();
        content = content.replace(/#{([A-Za-z]*)}/g, (s, name) => { return VARIABLES[name]; });
        await fs.writeFile(filePath, content);
    }
};

(async () => {
    try {
        console.log("📃  Configuring project...");
        console.log("Note: Once the configuration is done, the 'configure' script and js file will be removed.\n");

        VARIABLES["projectName"] = path.basename(process.cwd()).trim();
        VARIABLES["projectDescription"] = VARIABLES["projectName"];
        VARIABLES["projectAuthor"] = ((await cmd("git config --get user.name", false)) || path.basename(homedir())).trim();
        VARIABLES["projectRepository"] = "";

        if (!process.argv.some((v) => v === "-s" || v === "--skip")) {
            VARIABLES["projectName"] = VARIABLES["projectDescription"] = (await question(`Project name (${VARIABLES["projectName"]}): `)) || VARIABLES["projectName"];
            VARIABLES["projectDescription"] = await question(`Project description (${VARIABLES["projectDescription"]}): `) || VARIABLES["projectDescription"];
            VARIABLES["projectAuthor"] = await question(`Project author (${VARIABLES["projectAuthor"]}): `) || VARIABLES["projectAuthor"];
            VARIABLES["projectRepository"] = await question("Project repository: ") || VARIABLES["projectRepository"];
        }

        readline.close();

        VARIABLES["projectShortName"] = simplify(VARIABLES["projectName"]);

        const package = JSON.parse(await fs.readFile("package.json"));

        package.name = VARIABLES["projectShortName"];
        package.description = VARIABLES["projectDescription"];
        package.author = VARIABLES["projectAuthor"];
        package.repository = VARIABLES["projectRepository"];

        delete package.scripts["configure"];

        await fs.writeFile("package.json", JSON.stringify(package, null, 4));

        await substitute("src");
        
        console.log("\n📦  Installing packages...");
        
        await cmd("npm install");
        
        console.log("\n🧹  Cleaning up...");

        await fs.rm(".git", {
            force: true,
            recursive: true
        });
        await fs.rm("_configure.js");
        
        console.log("\n🎉  Project configured successfully!");
    } catch (e) {
        console.error("\n❌  Project configuration failed...");
        console.error(e);
        process.exit(1);
    }
})();