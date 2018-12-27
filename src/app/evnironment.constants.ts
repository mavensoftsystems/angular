// export class EnvironmentSettings {
   
//    public static DEV_URL='http://localhost:8090';
//     apiUrl(env):any {
//         if (env=="dev") {
//             return 'http://localhost:8090';
//         }
        
//     }
    
// } 

import {Injectable} from '@angular/core';

@Injectable()
export class EnvironmentSettings {
apiUrl(data:any) {
    if (data=="dev") {
        return 'http://localhost:8090';
    }
   
}

}