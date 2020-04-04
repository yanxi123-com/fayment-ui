pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        checkout([$class: 'GitSCM', branches: [[name: env.GIT_BUILD_REF]], 
                                                                                                    userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]]])
      }
    }
    stage('构建') {
      steps {
        echo '构建中...'
        sh 'npm install'
        sh 'REACT_APP_STAGE=beta npm run build'
        echo '构建完成.'
      }
    }
    stage('部署') {
      steps {
        echo '部署中...'
        sh '''chmod 600 config/deploy_beta_rsa
rsync -r -e "ssh -i config/deploy_beta_rsa" build/ deploy@112.125.25.82:/home/deploy/beta_enterprise_ui
'''
        echo '部署完成'
      }
    }
  }
}