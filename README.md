# Run the Project
1 - clone the repository
2 - npm install --force
3 - npm run android or npx react-native run-android


# for create apk
1 - create of keystore  =>  keytool -genkey -v -keystore your_key_name.keystore -alias your_key_alias -keyalg RSA -keysize 2048 -validity 10000

2 - copy the file (your_key_name.keystore) to the folder /android/app 

3 - open the file /android/gradle.properties and add the following lines of code

    MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
    MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
    MYAPP_UPLOAD_STORE_PASSWORD=*****
    MYAPP_UPLOAD_KEY_PASSWORD=*****
    
4 - Open the file android\app\build.gradle 
    signingConfigs {
        release {
          storeFile file('your_key_name.keystore')
          storePassword 'your_key_store_password'
          keyAlias 'your_key_alias'
          keyPassword 'your_key_file_alias_password'
        }
    }

    buildTypes {
        release {
          ....
          signingConfig signingConfigs.release
        }
    }


5 - We enter the folder /android and execute in cmd or powershell
  ./gradlew assembleDebug
  
  
6 - Our apk remains in the directory
  /android/app/build/outputs/apk/debug/
