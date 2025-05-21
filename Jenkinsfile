#!/usr/bin/env groovy

node {
    stage('parameters') {
        branch = env.BRANCH_NAME
        echo "Branch name: ${branch}"
        echo "Git commit: ${env.GIT_COMMIT}"
        echo "Git commit message: ${env.GIT_COMMIT_MESSAGE}"
        echo "Git author: ${env.GIT_AUTHOR}"
        echo "Git author email: ${env.GIT_AUTHOR_EMAIL}"
        echo "Git author name: ${env.GIT_AUTHOR_NAME}"
        echo "Workspace: ${env.WORKSPACE}"
    }
    stage('checkout') {
        echo "Checking out branch: ${branch}"
        checkout scm
        sh 'ls -la'
    }
    stage('node version') {
        echo "Node version: ${env.NODE_VERSION}"
        sh 'node -v'
    }
    stage('npm version') {
        echo "NPM version: ${env.NPM_VERSION}"
        sh 'npm -v'
    }
    stage('Deploy backend') {
        def dockerDir = 'docker'
        dir(dockerDir) {
            sh 'ls -la'
            echo "Current directory: ${env.WORKSPACE}/${dockerDir}"
            echo "Building backend in directory: ${dockerDir}"
            sh 'docker compose -f backend.yml down'
            sh 'docker compose -f backend.yml build'
            sh 'docker compose -f backend.yml up -d'
        }
    }
    stage('Deploy') {
        echo 'Deploying....'
    }
}