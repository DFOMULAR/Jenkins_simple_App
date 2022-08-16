pipeline {
    agent any

    stages {
        stage('Checkout Source') {
            steps {
                
                // git credentialsId: '2016a166-9bb8-44e9-aa9d-811a86ef1519', url: 'git@gitlab.com:oyedelemichael1/simple-app.git', branch:'master'
              //  git credentialsId: 'git', url: 'git@github.com/DFOMULAR/Jenkins_simple_App.git', branch: "${env.BRANCH_NAME}"
                git credentialsId: 'Github', url: 'https://github.com/DFOMULAR/Jenkins_simple_App.git', branch: 'main'

             //   echo "pulled ${env.BRANCH_NAME}"
            }
        }
        stage("Build image") {
            parallel{
                stage("build dev image"){
                    when{ not { anyOf { branch 'master' } } }
                        steps {
                            script {
                                myapp = docker.build("1234folarin574/simple-app-development:${env.BUILD_ID}")
                                env.image = "1234folarin574/simple-app-development:latest"
                            }
                        }

                }
                stage("build prod image"){
                    when{branch 'master'}
                        steps {
                            script {
                                myapp = docker.build("1234folarin574/simple-app-production:${env.BUILD_ID}")
                                env.image = "1234folarin574/simple-app-production:latest"
                            }
                        }

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
            parallel{
                stage("deploy dev"){
                    when{ not { anyOf { branch 'master' } } }
                        steps {
                            echo 'Deploying...now'
                            sh "sed -i 's~__NAMESPACE__~dev~g' manifest.yaml"
                            sh "sed -i 's~__IMAGE__~${image}~g' manifest.yaml"
                            script{
                                kubernetesDeploy(configs: "manifest.yaml", kubeconfigId: "k8s-config")
                            }
                        }

                }
                stage("deploy prod"){
                    when{branch 'master'}
                         steps {
                            echo 'Deploying...now'
                            sh "sed -i 's~__NAMESPACE__~prod~g' manifest.yaml"
                            sh "sed -i 's~__IMAGE__~${image}~g' manifest.yaml"
                            script{
                                kubernetesDeploy(configs: "manifest.yaml", kubeconfigId: "k8s-config")
                            }
                        }

                }
            }
            // steps {
            //     echo 'Deploying...now'
            //     sh 'sed -i 's~__NAMESPACE__~'"dev"'~' manifest.yaml'
            //     script{
            //         kubernetesDeploy(configs: "manifest.yaml", kubeconfigId: "k8s-config")
            //     }
            // }
        }
    }
}
