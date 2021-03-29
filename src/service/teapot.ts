export class brewTeaService {
    public static brewTea(typeOfTea: string) {
        let teaReg = new RegExp('*tea')
        let coffeeReg =new RegExp('*coffee') 
        let regArr = typeOfTea.match(teaReg)
        
        if (regArr != null) {
            return 'https://www.foodpanda.com.tw/'
        }
        else {
            regArr = typeOfTea.match(coffeeReg)
            if (regArr != null) {
                return "I'm a tea pot.I can't brew coffee"
            }
            else return 'Service Unavailable'
        }
    }
}