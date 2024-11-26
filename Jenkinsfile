pipeline {
    agent any
    //tools {
    //    nodejs "node 20.18.0"
    //}
    stages {
        stage('Verificar Repositório') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], useRemoteConfigs:[[url: 'https://github.com/adssenacgit/arquivosBackendNest.git']]])
            }
        }
        //stage('Instalar Dependências') {
        //    steps {
        //        sh 'node -v'
        //        sh 'npm install'
        //        sh 'npm run build'
        //    }
        //}
        stage('Construir Imagem Docker') {
            steps {
                script {
                    def appName = 'arquivosbackendnest'
                    def imageTag = "${appName}:${env.BUILD_ID}"

                    // Construir a imagem Docker
                    bat "docker build -t ${imageTag} ."
                }
            }
        }

        stage('Fazer Deploy') {
            steps {
                script {
                    def appName = 'arquivosbackendnest'
                    def imageTag = "${appName}:${env.BUILD_ID}"
                    // Parar e remover o container existente, se houver
                    bat "docker stop ${appName} || exit 0"
                    bat "docker rm ${appName}  || exit 0"
                    // Executar o novo container
                    bat "docker run -d --name ${appName} -p 3000:3000 ${imageTag}"
                }
            }
        }
    }
    post {
        success {
            echo 'Deploy realizado com sucesso!'
        }
        failure {
            echo 'Houve um erro durante o deploy.'
        }
    }
}