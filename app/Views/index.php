<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>CoasterManager</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <style>
        .navbar{margin-bottom: 20px;}
        main { padding: 30px;}
        * { font-size: 12px; }
    </style>
</head>
<body>

<div class="container" style="padding:20px;">

    <div class="container m-2 mb-5">
        <div class="d-flex align-items-center">
            <svg width="50" style="enable-background:new 0 0 688.515 666.255;" version="1.1" viewBox="0 0 688.515 666.255" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="_x31_6-Cable_car_cabin"><g><path d="M688.109,17.295c-2.274-11.602-13.516-19.173-25.139-16.888L17.294,127.114    c-11.607,2.28-19.168,13.531-16.888,25.139c2.003,10.216,10.959,17.296,20.992,17.296c1.365,0,2.755-0.131,4.146-0.408    l288.388-56.593v47.381c0,11.832,9.589,21.416,21.416,21.416s21.416-9.584,21.416-21.416v-55.783l314.457-61.712    C682.828,40.154,690.389,28.902,688.109,17.295z" style="fill:#37474F;"/><g><path d="M522.209,150.637H391.743c-11.827,0-21.416,9.589-21.416,21.416     c0,11.827,9.589,21.416,21.416,21.416v429.955c-11.827,0-21.416,9.589-21.416,21.416s9.589,21.416,21.416,21.416h130.467     c85.758,0,155.527-69.769,155.527-155.527v-204.57C677.736,220.406,607.967,150.637,522.209,150.637z" style="fill:#E54A19;"/></g><g><path d="M677.736,306.159c0-85.753-69.769-155.522-155.527-155.522H391.743     c-11.827,0-21.416,9.589-21.416,21.416c0,11.827,9.589,21.416,21.416,21.416v204.512h285.993V306.159z" style="fill:#0287D0;"/></g><g><path d="M400.359,150.637H198.816c-85.753,0-155.522,69.769-155.522,155.522v204.57     c0,85.758,69.769,155.527,155.522,155.527h201.543c85.753,0,155.522-69.769,155.522-155.527v-204.57     C555.881,220.406,486.112,150.637,400.359,150.637z" style="fill:#FE5722;"/></g><g><path d="M555.881,306.159c0-85.753-69.769-155.522-155.522-155.522H198.816     c-85.753,0-155.522,69.769-155.522,155.522v91.823h512.586V306.159z" style="fill:#03A8F3;"/></g><g><rect height="44.616" style="fill:#1565BF;" width="634.441" x="43.295" y="386.138"/></g><g><rect height="217.972" style="fill:#1565BF;" width="269.366" x="164.905" y="386.138"/></g><g><rect height="378.794" style="fill:#80D3F9;" width="201.54" x="198.818" y="190.515"/></g><g><rect height="378.794" style="fill:#4FC2F6;" width="104.621" x="295.737" y="190.515"/></g></g></g><g id="Layer_1"/></svg>
            <span class="ms-3" style="padding: 10px 0 0 30px; font-size: 24px; color: #fd5722;">Coaster Manager</span>
        </div>
    </div>

    <div id="main-customer"></div>
</div>

<script>const isLoggedIn = <?php echo session()->has('isLoggedIn') ?: 0; ?>;</script>
<script src="/dist/main.js" charset="utf-8"></script>

</body>
</html>