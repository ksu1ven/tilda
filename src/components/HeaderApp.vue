<template>
    <header class="header">
        <div class="container header__content">
            <nav>
                <ul class="nav__ul">
                    <li>
                        <RouterLink to="/" class="header__link">
                            <svg role="img" aria-hidden="true" width="35" height="35">
                                <use xlink:href="#logo-icon"></use>
                            </svg>
                        </RouterLink>
                    </li>
                    <li><RouterLink to="/" class="header__link"> Мои сайты </RouterLink></li>
                    <li>
                        <RouterLink to="/profile" class="header__link"> Профиль </RouterLink>
                    </li>
                </ul>
            </nav>
            <button type="button" class="button-link header__link">Выйти</button>
        </div>
    </header>
</template>
