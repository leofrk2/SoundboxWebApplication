<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use JMS\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/session", name="session_")
 */
class SessionController extends AbstractController
{
    public function __construct(EntityManagerInterface $mysql, SerializerInterface $serializer)
    {
        $this->mysql = $mysql;
        $this->serializer = $serializer;
    }

    /**
     * @Route("/login", name="session_login", methods={"POST"})
     */
    public function login(Request $request)
    {
        $data = json_decode($request->getContent());

        $user = $this->mysql->getRepository(User::class)->findOneBy(['username' => $data->username, 'password' => hash('sha256', $data->password)]);

        if ($user) {
            return new Response($this->serializer->serialize($user, 'json'));
        } else {
            // Return error
            return new JsonResponse(['error' => 'Invalid credentials'], Response::HTTP_UNAUTHORIZED);
        }
    }
}
