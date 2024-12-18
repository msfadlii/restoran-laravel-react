<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Hapus kolom status yang lama
        // Schema::table('orders', function (Blueprint $table) {
        //     $table->dropColumn('status');
        // });

        // // Tambahkan kolom status dengan enum yang baru
        // Schema::table('orders', function (Blueprint $table) {
        //     $table->enum('status', ['pending', 'selesai', 'cancel'])->default('pending');
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Jika rollback, kita kembalikan ke enum sebelumnya
        Schema::table('orders', function (Blueprint $table) {
            $table->enum('status', ['pending', 'selesai', 'cancel'])->default('pending');
        });
    }
};
