<?php

namespace App\Controller;

use App\Entity\Sound;
use Doctrine\ORM\EntityManagerInterface;
use JMS\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/sound", name="sound_")
 */
class SoundController extends AbstractController
{

    public function __construct(EntityManagerInterface $mysql, SerializerInterface $serializer)
    {
        $this->mysql = $mysql;
        $this->serializer = $serializer;
    }

    /**
     * @Route("/index", name="index")
     */
    public function index()
    {
        $sounds = $this->mysql->getRepository(Sound::class)->findAll();

        return new Response($this->serializer->serialize($sounds, 'json'));
    }

    /**
     * @Route("/add", name="add", methods={"POST"})
     */
    public function add(Request $request)
    {
        $data = $request->request->all();
        $file = $request->files->get('file');

        $sound = new Sound();
        $sound->setName($data['name']);

        $this->mysql->persist($sound);
        $this->mysql->flush();

        // Move the file
        $file->move(
            $this->getParameter('sounds_directory'),
            $sound->getId() . '.mp3'
        );

        return new Response(Response::HTTP_CREATED);
    }

    /**
     * @Route("/delete/{id}", name="delete", methods={"DELETE"})
     */
    public function delete(Int $id)
    {
        $sound = $this->mysql->getRepository(Sound::class)->find($id);

        $this->mysql->remove($sound);
        $this->mysql->flush();

        return new Response(Response::HTTP_OK);
    }
}
