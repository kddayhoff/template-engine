const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const inquirer = require("inquirer");
const path = require("path");



function getInfo() {
    inquirer
     .prompt([
       {
            type: "input",
            name: "name",
            message: "What is your name?"
        },

        {
            type: "number",
            name: "id",
            message: "What is your employee ID number?"
        },

        {   
            type: "input",
            name: "email",
            message: "What is your email address?"
        },
        {
            type: "choice",
            message: "What is your role?",
            name: "role",
            choices: [
              "Intern", 
              "Engineer", 
              "Manager"
            ]
          }]
        )
        }
          const team = []; 
         
          const getTeam = () => {
              inquirer
              .prompt ([
                 {
                    type: "list",
                    message: "What would you like to do?",
                    choices: ["Build Team", "Finish Team"],
                    name: "newTeam",
                  }
              ])
          
          .then((response) =>  {
              const buildTeam = response.newTeam;
              switch (buildTeam) {
                  case "Build Team":
                      inquirer
                      .prompt(questions)
                      .then((choices) => {
                
                        if (choices === "Intern") {
                        console.log("intern");
                        inquirer
                        .prompt( {  
                            type: "input", 
                            message: "What school did you attend?",
                            name: "school"
                        })
                        .then((answerInt) => {
                            let newIntern = new Intern(
                                choices.name, choices.id, choices.email, answerInt.school);
                            team.push(newIntern);
                        getTeam();
                     });
                    
                    }
                })
            }
        })
    }
    getInfo();