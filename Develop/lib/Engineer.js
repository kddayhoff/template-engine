// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, github, GitHubUser) {
      super(name, id, email);
      this.github = github;
      this.GitHubUser = this.GitHubUser;
    }

    github() {
        return this.github;
        return this.GitHubUser;
    }

    getRole() {
        return "Engineer";
    }

}

const engineer = new Engineer(name, 1, email, github, GitHubUser, "Engineer");

console.log(engineer)

