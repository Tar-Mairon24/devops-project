node {
    stage('Build') {
        echo 'Building....'
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