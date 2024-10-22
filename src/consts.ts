// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = '春希のブログ';
export const SITE_DESCRIPTION = '春希のブログ';

export function t_bio(language: string) {
  switch (language) {
    case 'zh':
      return '孤战非所望，俗安不可期。';
    case 'en':
      return "If solitary exodus is a kind of imperative, I\'m not cowered.";
  }
}

export const GLOBAL_STYLE: 'quartz' | 'glass' | 'lightGlass' = 'lightGlass'

export const COPYRIGHT_NAME = 'Nikaidou Haruki';