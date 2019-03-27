workflow "Test and Build" {
  on = "push"
  resolves = ["Build"]
}

action "Install Dependencies" {
  uses = "actions/npm@master"
  args = "install"
}

action "Test" {
  needs = "Install Dependencies"
  uses = "actions/npm@master"
  args = "test"
}

action "Build" {
  needs = "Test"workflow "Test and Build" {
  on = "push"
}

action "Install Dependencies" {
  uses = "actions/npm@master"
  args = "install"
}

action "Test" {
  needs = "Install Dependencies"
  uses = "actions/npm@master"
  args = "test"
}

action "Build" {
  needs = "Test"
  uses = "actions/npm@master"
  args = "run build"
}
workflow "Test and Build" {
  on = "push"
}

action "Install Dependencies" {
  uses = "actions/npm@master"
  args = "install"
}

action "Test" {
  needs = "Install Dependencies"
  uses = "actions/npm@master"
  args = "test"
}

action "Build" {
  needs = "Test"
  uses = "actions/npm@master"
  args = "run build"
}
  needs = "Test"

  uses = "actions/npm@master"
  args = "run build"
}
