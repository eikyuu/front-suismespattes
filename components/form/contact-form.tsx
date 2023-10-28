'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { postMessage } from '../../@core/services/contactService';
import Loader from '../loader/loader';
import toast from 'react-hot-toast';

const formSchema = z.object({
  email: z.string().email({ message: 'Email invalide' }),
  subject: z.string().min(3, { message: 'Le sujet doit contenir au moins 3 caractères' }),
  message: z
    .string()
    .min(10, {
      message: 'Le message doit contenir au moins 10 caractères.',
    })
    .max(500, {
      message: 'Le message doit contenir au plus 500 caractères.',
    }),
});

export function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      subject: '',
      message: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (form: z.infer<typeof formSchema>) => {
      return postMessage(form);
    },
    onSuccess: () => {
      form.reset();
      toast.success('Votre message a bien été envoyé');
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de l'envoi du message");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white'>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription className='text-white sr-only'>
                Email de contact pour vous répondre
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='subject'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white'>Objet</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription className='text-white sr-only'>
                Objet de votre message
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='message'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white'>Message</FormLabel>
              <FormControl>
                <Textarea className='resize-none' {...field} />
              </FormControl>
              <FormDescription className='text-white sr-only'>
                Objet de votre message
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant={'tertiary'} type='submit'>
          {mutation.isPending ? <Loader /> : 'Envoyer'}
        </Button>
      </form>
    </Form>
  );
}
