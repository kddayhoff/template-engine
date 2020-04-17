const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const inquirer = require("inquirer");

//empty array for newly built team
let team = []; 

//ask base Employee questions    
const getInfo = [
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
        
//initialize questions for team members w/ inquirer starting with the choice to build a team or complete it
        getTeam = () => {
            inquirer
              .prompt([
                {
                  type: "list",
                  message: "What would you like to do?",
                  choices: ["Build Team", "Finish Team"],
                  name: "newTeam",
                },
              ])
   
   //builds team based on roles selected   
          .then((response) =>  {
              const buildTeam = response.newTeam;
              switch (buildTeam) {
                  case "Build Team":
                      inquirer
                      .prompt(getInfo)
                      .then((choices) => {
          //should the user choose Intern:      
                        if (choices.role === "Intern") {
                        inquirer
                        .prompt( {  
                            type: "input", 
                            message: "What school did you attend?",
                            name: "school"
                        })
                        .then((answer) => {
                            let newIntern = new Intern(
                                choices.name, choices.id, choices.email, answer.school);
                            team.push(newIntern);    
                        getTeam()  
                     });
                    }
            //should the user choose Engineer:
                        else if (choices.role === "Engineer") {
                            console.log("engineer");
                            inquirer
                            .prompt( {
                                type: "input",
                                message: "What is your Github username?",
                                name: "github"
                            })
                        .then((answer) => {
                          let newEngineer = new Engineer
                             (choices.name, choices.id, choices.email, answer.github);
                          team.push(newEngineer);
                         getTeam();      
                        });
                    }
             //Should the user choose Manager:       
                        else if (choices.role === "Manager") {
                            console.log("manager");
                            inquirer
                            .prompt( {
                                type: "input",
                                message: "What is your office phone number",
                                name: "number"
                            })
                        .then((answer) => {
                          let newManager = new Manager(choices.name, choices.id, choices.email, answer.number);
                          team.push(newManager);
                        getTeam();    
                        });
                      }
                    });
                break;
         //should the user wish to finish team:       
            case "Finish Team":
                console.log(team);
              if (team.length > 0) {
            writeHTML(render(team));
            } 
            else {
            console.log("no team members found");
           }
          break;
        default:
          break;
            }
        })   
    }  
    getTeam();
// Write to Page
const writeHTML = (HTML) => {
  console.log(HTML);
  fs.writeFileSync(outputPath, HTML, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("Success!");
  });
};