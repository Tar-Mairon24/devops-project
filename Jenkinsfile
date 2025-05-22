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
    stage('Deploy') {
        echo 'Deploying....'
    }
}
