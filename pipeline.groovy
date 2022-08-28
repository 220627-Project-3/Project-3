timestamps {
    node() {
        stage('Checkout') {
            checkout([$class: 'GitSCM', branches: [
                [name: '*/main']
            ], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [
                [credentialsId: 'cruzgsworks', url: 'https://github.com/220627-Project-3/Project-3.git']
            ]])
        }
        stage('Unit Test') {
            dir('e-commerce-backend-main') {
                try {
                    sh 'chmod +x gradlew'
                    sh './gradlew clean test --no-daemon' //run a gradle task
                } finally {
                    junit '**/build/test-results/test/*.xml' //make the junit test results available in any case (success & failure)
                }
            }
        }
        stage('Gradle Build & Deploy') {
            dir('e-commerce-backend-main') {
                sh './gradlew build -x test'
                sh 'docker build -t revatureswagshop_backend:v1 .'

                sh 'docker rm -f revatureswagshop_backend-container && echo "container myjob removed" || echo "container myjob does not exist"'

                sh 'docker image prune --force'
                sh 'docker run --name revatureswagshop_backend-container -d -p 8080:8080 -p 8443:8443 revatureswagshop_backend:v1'
            }
        }
        stage('Angular Build & Deploy') {
            dir('e-commerce-frontend-angular-main') {
                sh 'npm install'
                sh 'ng build --configuration production'
                sh 'docker build -t revatureswagshop_frontend:v1 .'

                sh 'docker rm -f revatureswagshop_frontend-container && echo "container myjob removed" || echo "container myjob does not exist"'

                sh 'docker image prune --force'
                sh 'docker run --name revatureswagshop_frontend-container -d -p 80:80 -p 443:443 revatureswagshop_frontend:v1'
            }
        }
    }
}
