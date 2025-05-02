<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class UserRegisteredNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */

    public $newUser;

    public function __construct(User $newUser)
    {
        $this->newUser = $newUser;
    }

    

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    // public function via(object $notifiable): array
    // {
    //     return ['mail'];
    // }
    
    public function via($notifiable)
    {
        return ['database'];
    }
    /**
     * Get the mail representation of the notification.
     */
    public function toDatabase($notifiable)
    {
        return [
            'message' => "Nouvel utilisateur inscrit: {$this->newUser->name} ({$this->newUser->role})",
            'user_id' => $this->newUser->id
        ];
    }

    // public function toMail(object $notifiable): MailMessage
    // {
    //     return (new MailMessage)
    //         ->line('The introduction to the notification.')
    //         ->action('Notification Action', url('/'))
    //         ->line('Thank you for using our application!');
    // }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
