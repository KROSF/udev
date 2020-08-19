# UDEV

[dev.to](https://dev.to/) clone to practice usign Codeigniter 4.

## Requirements

- [VSCode](https://code.visualstudio.com/)
  - [Remote Container Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- [Node](https://nodejs.org/en/)
  - [Yarn](https://classic.yarnpkg.com/lang/en/)
- [Docker](https://www.docker.com/)

## SetUp

- **Backend**

  - open root folder with remote container extension `cmd|ctrl` + `shift` + `p`
    - select Option: `Remote-Container: Rebuild and Reopen in Container`
    - wait
    - open a terminal inside vscode
    - run `composer install`
    - run `php spark migrate`

- **FrontEnd**
  - `cd ./frontend`
  - `code .`
  - `yarn install`
  - `yarn start`
  - goto http://localhost:3000/register and create a user
  - goto http://localhost:8025/ to verify email
