pipeline {
    agent any

    stages {
        stage('Checkout Source') {
            steps {
                
                git credentialsId: '2016a166-9bb8-44e9-aa9d-811a86ef1519', url: 'git@gitlab.com:oyedelemichael1/simple-app.git', branch:'master'
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
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                            myapp.push("latest")
                            myapp.push("${env.BUILD_ID}")
                    }
                }
            }
        }

        stage('Deploy to kubernetes') {
            steps {
                echo 'Deploying...now'
                script{
                    kubernetesDeploy(configs: "manifest.yaml", kubeconfigId: "k8s")
                }
            }
        }
    }
}
