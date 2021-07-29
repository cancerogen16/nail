<?php

namespace Database\Seeders;

use Faker\Factory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;



class ActionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $faker = Factory::create('ru_RU');

        for ($i = 1; $i <= 30; $i++) {

            $name = "Акция {$i}";

            $start_at = $faker->dateTimeBetween('-2 months', '-1 month')->format('Y-m-d H');

            $end_at = $faker->dateTimeBetween('+1 months', '+3 month')->format('Y-m-d H');

            $actions[] = [

                'service_id' => $faker->numberBetween(1, 29),
                'name' => $name,
                'photo' => $faker->imageUrl(300, 300, 'actions', true, $name),
                'description' => $faker->realText(500),
                'price' => $faker->numberBetween(500,10000),
                'start_at' => $start_at,
                'end_at' => $end_at,
                'created_at' => $faker->dateTimeBetween('-3 months', '-2 months 2 weeks'),
                'updated_at' => $faker->dateTimeBetween('-2 months -2 weeks', '-2 months'),
            ];

        }
            DB::table('actions')->insert($actions);


    }
}
