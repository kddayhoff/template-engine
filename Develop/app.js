const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const inquirer = require("inquirer");


let team = []; 
//ask base Employee questions
    
         
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
}

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
            type: "list",
            message: "What is your role?",
            choices: [
              "Intern", 
              "Engineer", 
              "Manager"
            ],
            name: "role",
          }]
        )
    // build team with const team empty array    
  
          .then((response) =>  {
              console.log(response)
              const buildTeam = response.newTeam;
              switch (buildTeam) {
                  case "Build Team":
                      inquirer
                      .prompt(questions)
                      .then((choices) => {
          //should the user choose Intern:      
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
                        getTeam()  
                     });
                    }
            //should the user choose Engineer:
                        else if (choices === "Engineer") {
                            console.log("engineer");
                            inquirer
                            .prompt( {
                                type: "input",
                                message: "What is your Github username?",
                                name: "github"
                            })
                        .then((answerEng) => {
                          let newEngineer = new Engineer
                             (choices.name, choices.id, choices.email, answerEng.github);
                          team.push(newEngineer);
                         getTeam();      
                        });
                    }
             //Should the user choose Manager:       
                        else (choices === "Manager") 
                            console.log("manager");
                            inquirer
                            .prompt( {
                                type: "input",
                                message: "What is your office phone number",
                                name: "number"
                            })
                        .then((answerMan) => {
                          let newManager = new Manager(choices.name, choices.id, choices.email, answerMan.number);
                          team.push(newManager);
                        getTeam();    
                        })
                    });
                break;
         //should the user wish to finish team:       
            case "Finish Team":
                console.log(team);
              if (team.length > 0) {
                console.log("all done!");
            writeHTML(render(team));
            } 
            else {
            console.log("no team members");
           }
          break;
        default:
          break;
            }
        })   
    }  

    getInfo();
    