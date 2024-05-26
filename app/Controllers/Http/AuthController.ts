import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import {string} from '@ioc:Adonis/Core/Helpers'

export default class AuthController {
    public async register({request,response}: HttpContextContract) {
        const {full_name, username, password} = request.body();

        const isExist = await User.findBy('username', username)

        if(isExist) {
            return response.status(422).json({
                status: 'fail',
                message: 'Username sudah terdaftar!'
            })
        }

        const user = await User.create({
            id: string.generateRandom(32),
            full_name: full_name,
            username: username,
            password:password
        })

        return response.status(201).json({
            status: 'success',
            message: 'Berhasil Register!',
            data : {
                user : user
            }
        })


    }

    public async login({request, response, auth}: HttpContextContract){
        const {username, password} = request.body()

        try {
            const token = await auth.use('api').attempt(username,password)

            return token
        
        } catch {
            return response.unauthorized("invalid username & password")
        }
    }

    public async logout({response, auth}:HttpContextContract){
        await auth.use('api').revoke()

        return response.json({
            status: 'success',
            message: 'Anda telah Logout!'
        })
    }
}
