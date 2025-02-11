<?php

namespace App\Controllers;

class Secure extends BaseController
{
    public function __construct()
    {
        if (ENVIRONMENT === 'production') {
            if (!session()->has('isLoggedIn')) {
                return redirect()->to('/login');
            }
        }
    }

    public function login()
    {
        return view('login_view');
    }

    public function login_submit()
    {
        $username = $this->request->getPost('username');
        $password = $this->request->getPost('password');

        if ($username === 'admin' && $password === 'admin123') {
            session()->set('isLoggedIn', true);
            return redirect()->to('/');
        }

        return redirect()->to('/login')->with('error', 'Invalid credentials');
    }

    public function logout()
    {
        session()->remove('isLoggedIn');
        return redirect()->to('/login');
    }
}
