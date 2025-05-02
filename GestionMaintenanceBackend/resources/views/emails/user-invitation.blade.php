@component('mail::message')
# Invitation à rejoindre notre plateforme

Vous avez été invité en tant que {{ $role }} sur notre plateforme.

@component('mail::button', ['url' => $link])
Accepter l'invitation
@endcomponent

Ce lien expirera dans 7 jours.

Merci,<br>
{{ config('app.name') }}
@endcomponent