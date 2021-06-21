#!/usr/bin/env node

const fs = require('fs')
const chalk = require('chalk')
const path = require('path')
const {lstat} = fs.promises

const targetDir = process.argv[2] || process.cwd()

fs.readdir(targetDir, async (err, filenames) => {
    if (err) {
        throw new Error(err)
    }
    try {
        const statPromises = filenames.map(filename => lstat(path.join(targetDir, filename)))

    const allStats = await Promise.all(statPromises)

    for(let stat of allStats){
        const index = allStats.indexOf(stat)
        if(stat.isFile()){
            console.log(chalk.yellow(filenames[index]))
        } else if(stat.isDirectory()){
            console.log(chalk.cyanBright.bold(filenames[index]))
        }
    }
        
    } catch (error) {
        throw new Error(error)
    }
    
})