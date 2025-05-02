<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['super_admin', 'admin', 'user'])->default('user');
            $table->enum('status', ['Actif', 'Inactif'])->default('Actif');
            $table->string('invitation_token')->nullable();
            $table->timestamp('invited_at')->nullable();
            $table->timestamp('invitation_accepted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
