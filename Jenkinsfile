pipeline {
    agent any

    stages {
        stage('Checkout Source') {
            steps {
                git url:'https://gitlab.com/oyedelemichael1/simple-app.git', branch:'master'
            }
        }
        stage("Build image") {
            steps {
                script {
                    myapp = docker.build("oyedelemichael1/simple-app:${env.BUILD_ID}")
                }
            }
        }
    
      stage("Push image") {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-credential') {
                            myapp.push("latest")
                            myapp.push("${env.BUILD_ID}")
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying...now'
            }
        }
    }
}
