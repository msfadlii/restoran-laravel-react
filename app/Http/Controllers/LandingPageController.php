<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingPageController extends Controller
{
    public function create()
    {
        return Inertia::render('Client/components/landing page/landingPage');
    }

    public function book_table_view()
    {
        return Inertia::render('Client/componens/book_table/Index');
    }

}
