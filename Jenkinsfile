pipeline {

    agent any

    tools {
        nodejs 'NodeJS-20'
    }

    environment {
        CI = 'true'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code from GitHub...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                echo 'Installing Playwright browsers...'
                sh 'npx playwright install --with-deps chromium'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo 'Running login setup and Order tests...'

                sh '''
                    npx playwright test --project=Orders
                '''
            }
        }
    }

    post {

        always {
            echo 'Publishing Playwright reports...'

            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report',
                reportTitles: 'Playwright Test Report'
            ])

            archiveArtifacts(
                artifacts: 'test-results/**/*',
                allowEmptyArchive: true
            )
        }

        success {
            echo 'Playwright tests completed successfully.'
        }

        failure {
            echo 'Playwright tests failed. Check the Playwright report.'
        }
    }
}